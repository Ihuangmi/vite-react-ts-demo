import axios from "axios";
function wrapPromise(promise: Promise<any>) {
    let status = "pending";
    let result: any;
    const suspendor = promise.then((res) => {
        console.log('promise===>', res)
        status = "success"
        result = res
    }, (err) => {
        console.log('promise===>', err)
        status = "error"
        result = err
    })

    return {
        read() {
            if (status === "success") {
                console.log('success')
                return result
            } else if (status === "error") {
                console.log('error')
                throw result
            } else if (status === "pending") {
                console.log('pending')
                throw suspendor
            }
        }
    }
}

export function fetchData(url: string) {
    console.log("🚀 ~ file: fetchData.ts:32 ~ fetchData ~ url:", url)
    let promise = axios.get(url).then(res => {
        console.log(res.data)
        return res.data
    })
    return wrapPromise(promise)
}