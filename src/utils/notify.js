import {message} from 'antd'


export function optSucessNotify(msg){
    message.info(msg);
}

export function optFailedNotify(msg){
    message.error(msg);
}