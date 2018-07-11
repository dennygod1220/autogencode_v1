'use strict'


class JustDspController {
    async index({session,response,request,view}){
        return view.render('justDSP.index')
    }
//接收網站 站點資訊
    async getInfo({session,response,request,view}){
        var data = request.all();
        if(data.eve_num >0){
            var eve_num = [];
            for(var i=1;i<parseInt(data.eve_num)+1;i++){
                eve_num.push(i);
            }
            //有事件的
            return view.render('justdsp.haveevent',{
                site_name:data.site_name,
                site_url:data.site_url,
                eve_num:data.eve_num,
                all_eve:eve_num
            })
        }
        else{
            //無事件的頁面
            return view.render('justdsp.noevent',{
                site_name:data.site_name,
                site_url:data.site_url,
                eve_num:data.eve_num
            })
        }
    }

    //只有PV
    async justPV({session,response,request,view}){

    }

}

module.exports = JustDspController
