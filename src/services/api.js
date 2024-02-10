import axios from 'axios';
import swal from 'sweetalert2'

const axiosRequest = axios.create({
    baseURL:'http://191.96.31.128:8080'
})

export const fetch = async (url)=>{
   try {
    const response = await axiosRequest.get(url)
    return response.data
   } catch (error) {
    swal.fire({
        title:'error',
        icon:'error',
        titleText:'An error has occured!',
        text:error.response.data.body.data.errors[0].msg,
        color:'#ffffff',
        background:'#808000'
       })
   }
}

export const post = async(url,body,options)=>{
    try {
        const response = await axiosRequest.post(url,body,options)
        return response.data
    } catch (error) {
       swal.fire({
        title:'error',
        icon:'error',
        titleText:'An error has occured!',
        text:error.response.data.body.data.errors[0].msg,
        color:'#ffffff',
        background:'#808000'
       })
    }
}

export const patch = async(url,body,options)=>{
    try {
        const response = await axiosRequest.patch(url,body,options)
        return response.data
    } catch (error) {
        swal.fire({
            title:'error',
            icon:'error',
            titleText:'An error has occured!',
            text:error.response.data.body.data.errors[0].msg,
            color:'#ffffff',
            background:'#808000'
           }) 
    }
}