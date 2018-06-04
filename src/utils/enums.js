




const ENUMS = {

    ErrCode:{
        Success:200,
        Failed:-1000,
        ParamInvalid:-1001,
        PermissionDeny:-1002
    },
    ErrCodeMessage:{
        Success:"ok",
        Failed:"服务器内部错误",
        ParamInvalid:"输入参数错误",
        PermissionDeny:"权限错误"
    },

    AccoutType: {
        SuperAdmin: 0,
        Admin: 1,
        Staff: 2,
        Guest: 3
    },

    ClientStatus: {
        ACTIVE: 0,
        FORBIDEN: -1
    },

    OrderStatus: {
        Pending: 0,
        Canceled: 1,
        Rejected: 2,
        Pass: 3,
        Finished: 4
    }
}




module.exports = {
    ENUMS
}
