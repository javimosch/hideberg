var ctrl = require('../model/backend-controllers-manager');
var actions = {
    log: (m) => {
        console.log('CATEGORY'.toUpperCase() + ': ' + m);
    }
};
module.exports = {
    agrupar: (data, cb) => {
        ctrl.$User.model.count({
            userType: 'admin'
        }, (err, r) => {
            console.log('agrupar-res', err, r);
        });
        console.log('category-agrupar-success');
    },
    import: _import
};

function _import(data, cb) {
    actions.log('IMPORT:start:'+data.code);
    //expected ex: {"code":"home","description":"Autogenerated page section","_parent":"DIAGS"}
    var db = ctrl('Category');
    if (data._parent) {
        db.get({
            code: data._parent.code
        }, (err, _parent) => {
            if (err) return cb(err);
            if (!_parent) {
                _import(data._parent, (err, _parent) => {
                    if (err) return cb(err);
                    data._parent = _parent._id;
                    data.__match=['code'];
                    return db.save(data, db);
                })
            }
            else {
                data._parent = _parent._id;
                data.__match=['code'];
                return db.save(data, db);
            }
        })
    }
    else {
        data.__match=['code'];
        return db.save(data, db);
    }
}