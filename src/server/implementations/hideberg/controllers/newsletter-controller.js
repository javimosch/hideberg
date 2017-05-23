var path = require('path');
var resolver = require(path.join(process.cwd(), 'lib/resolver'));
var logger = resolver.logger().get('newsletter', 'controller');
var Mailchimp = require('mailchimp-api-v3')
var mailchimp = new Mailchimp(resolver.env().MAILCHIMP_API_KEY);
var md5 = require('md5');
var MAILCHIMP_LIST_ID = resolver.env().MAILCHIMP_LIST_ID || "774331de88";
/*
mailchimp.get(path, [query], [callback])
mailchimp.post(path, [body], [callback])
mailchimp.put(path, [body], [callback])
mailchimp.patch(path, [body], [callback])
mailchimp.delete(path, [callback])
*/

function addLocally(email) {
    return resolver.coWrapExec(function*() {
        //Save the email in our server
        var doc = yield resolver.model().emails.findOne({
            email: email
        });
        if (!doc) {
            doc = yield resolver.model().emails.create({
                email: email
            });
            logger.debugTerminal('addLocally: Added ', email);
        }
        else {
            logger.debugTerminal('addLocally: Alredy exists ', email);
        }
        return resolver.Promise.resolve(true);
    });
}

module.exports = {
    add: (data) => {
        if (!data.email) return resolver.Promise.reject("Email required");
        return resolver.coWrapExec(function*() {
            //Fetch the list from mailchimp (the list must exists);
            var list = yield mailchimp.get("/lists/" + MAILCHIMP_LIST_ID);
            return resolver.promise((resolve, reject) => {
                logger.debugTerminal("Checking if email exists in mailchimp list...", data.email);
                mailchimp.get("/lists/" + MAILCHIMP_LIST_ID + "/members/" + md5(data.email.toLowerCase())).then(() => {
                    return resolver.coWrapExec(function*() {
                        yield addLocally(data.email);
                        return "Already subscribed";
                    }).then(resolve).catch(reject);
                }).catch(res => {
                    logger.debugTerminal("Mailchimp (memeber fetch) says", res);
                    return resolver.coWrapExec(function*() {
                        logger.debugTerminal("Subscribing to mailchimp list...");
                        //Save the email in mailchimp
                        res = yield mailchimp.post("/lists/" + MAILCHIMP_LIST_ID + "/members", {
                            "email_address": data.email,
                            "status": "subscribed",
                        });
                        logger.debugTerminal("mailchimp says", res);
                        yield addLocally(data.email);
                    }).then(resolve).catch(reject);
                });
            });
        });
    }
}
