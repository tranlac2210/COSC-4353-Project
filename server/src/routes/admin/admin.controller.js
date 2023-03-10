const clients = [
    {
        id: 0,
        first: "chuong",
        last: "tran",
        address: "richmond, tx",
        active: 1,
        orders: [
            {
                id: 1,
                name: "95",
                total: 200
            }
        ]
    },
    {
        id: 1,
        first: "chuong3",
        last: "tran",
        address: "richmond, tx",
        active: 1,
        orders: [
            {
                id: 1,
                name: "95",
                total: 200
            }
        ]
    },
    {
        id: 2,
        first: "chuong4",
        last: "tran",
        address: "richmond, tx",
        active: 1,
        orders: [
            {
                id: 1,
                name: "95",
                total: 200
            }
        ]
    },
 
]

export const getClients = (req, res) => {
    try {
        // let {id, ...toBeShow} = clients;
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

export const deactivateClient = (req, res) => {
    var id = req.params.id

    var clientToBeUpdated = clients.find((client) => client.id == id);

    if (clientToBeUpdated == null) {
        return res.status(400).json({
            error: "Something wrong happened. Please try again!"
        })
    }

    clientToBeUpdated.active = 0;

    return res.status(200).json({
        success: "Successfully deactivate a client."
    })
}

export const getClientOrder = (req, res) => {
    try {
        var id = req.params.id;
        var client = clients.find(c => c.id == id);

        if (client == null) {
            res.status(400).json({
                error: "ID is invalid."
            })
        }
        
        res.status(200).json(client.orders);
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

export const modifyClientInfo = (req, res) => {
    try {
        const incomingData = req.body;
        let id = incomingData.id;

        var clientToBeUpdated = clients.find((client) => client.id == id);

        if (clientToBeUpdated == null) {
            return res.status(400).json({
                error: "Something wrong happened. Please try again!"
            })
        }

        clientToBeUpdated.first = incomingData.first;
        clientToBeUpdated.last = incomingData.last;
        clientToBeUpdated.address = incomingData.address;

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}