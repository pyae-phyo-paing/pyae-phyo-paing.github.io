$(document).ready(function(){

    $('.addToCart').click(function(){
        // alert("Hello");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        console.log(id,name,price);

        let items = {
            id : id,
            name : name,
            price : price,
            qty : 1
        }

        let itemsString = localStorage.getItem('shops');
        let itemsArray ;
        if (itemsString == null) {
            itemsArray = [];
        }else{
            itemsArray = JSON.parse(itemsString);
        }

        let status = false;  // သူတို့က true and false နှစ်ခုပဲ ရှိတာ 
        $.each(itemsArray, function(i,v){
            if(v.id == id){ 
                v.qty++ ;
                status = true;
            }
        })

        if(status == false){  // status က false နဲ့ ညီသွားတဲ့အတွက်ကြောင့် အသစ် ထည့်သွားတာ
            itemsArray.push(items);
        }


        let itemsData = JSON.stringify(itemsArray);
        localStorage.setItem('shops', itemsData);
        
    })

})