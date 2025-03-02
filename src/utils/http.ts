import instance from "./axios"

const post = (url:any, data:any) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
const get = (url:any, data:any) => {
    return new Promise((resolve, reject) => {
        // instance.get(url, { params: data }).then(res =&gt; {
        //     console.log(data)
        //     // console.log("res:")
        //     var table={
        //         table_list:Array.prototype.slice.call(res.data,data.size*(data.current-1),data.size*data.current),
        //         total: Object.keys(res.data).length
        //     }
        //     // console.log(table)
        //     resolve(table)
        instance.get(url,{params:data}).then(res=>{     //为什么需要加一个参数才可以在里面接收到'query'中
            // console.log(res)
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

const put = (url:any, data:any) => {
    return new Promise((resolve, reject) => {
        instance.put(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const del = (url:any, data:any) => {
    return new Promise((resolve, reject) => {
        // console.log('test:')
        // console.lot('data')
        instance.delete(url, { params: data }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    post, get, put, del
}