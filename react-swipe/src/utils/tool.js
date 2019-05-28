export default {
    unitConvert(num){  //计算单位
        let endNum = num.toString();
        let unit = "";
        
        if(endNum.length > 8 && endNum.length < 13){
            endNum = ( parseInt( (endNum / 100000000) * 100 ) / 100 ).toFixed(2);
            unit = "亿"
        }else if(endNum.length > 4 && endNum.length < 9){
            endNum = ( parseInt( (endNum / 10000) * 100 ) / 100 ).toFixed(2);
            unit = "万"
        }else if(endNum.length < 5){
            unit = ""
        }else{
            endNum = ( parseInt( (endNum / 100000000000) * 100 ) / 100 ).toFixed(2);
            unit = "千亿"
        }
        
        var m = {
            num: 0, 
            unit: ""
        }; 
        m.num = endNum; 
        m.unit = unit; 
        // if(string == "unit"){
        //     return m.unit
        // }else{
        //     return m.num
        // }
        return m.num + m.unit
        
    },

}