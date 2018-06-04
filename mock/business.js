export function getOrder(req, res, u) {
    const result = {
        list: [
            {
                key: '1',
                orderid: "001",
                userid: 'John Brown',
                amout: 32,
                createtime: "2018-01-01",
                status: 0,
            },
            {
                key: '1',
                orderid: "001",
                userid: 'John Brown',
                amout: 32,
                createtime: "2018-01-01",
                status: 1,
            },
            {
                key: '1',
                orderid: "001",
                userid: 'John Brown',
                amout: 32,
                createtime: "2018-01-01",
                status: 2,
            },
        ],
        pagination: {
            total: 100,
            pageSize:10,
            current: 1,
        },
    };


    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}