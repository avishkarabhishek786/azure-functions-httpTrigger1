import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    context.log('HTTP trigger function processed a request.');
    
    try {
        const payload = (req.query.payload || (req.body && req.body.payload));
        
        if(!payload) throw new Error("No payload found");

        context.bindings.outoutSbMsg = {
            body: JSON.stringify(payload)
        }

        context.res = {
            status: 200,
            body: {
                message: "Payload forwarded to Servicebus",
                payload
            }
        }

    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 400,
            body: {error}
        }
    }

};

export default httpTrigger;