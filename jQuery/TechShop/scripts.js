$(document).ready(function(){
    
    
    getData();
    count();


    
    $('.addToCart').click(function(){
        // alert("Hello");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        // console.log(id,name,price);

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

        count();
    })



    function getData(){
        let dataString = localStorage.getItem('shops');
        if (dataString){
            let dataArray = JSON.parse(dataString);
            // console.log(dataArray);
            

            let table = '';
            let j = 1;
            let totalPrice = 0;

            $.each(dataArray,function(i,v){

                table += `<tr>
                            <td>${j++}</td>
                            <td>${v.name}</td>
                            <td>${v.price}</td>
                            <td><button style="margin-right:10px; padding:5px 5px 5px; font-size:20px;">+</button>${v.qty}<button style="margin-left:10px; padding:5px 5px 5px;font-size:20px;">-</button></td>
                            <td>${v.price * v.qty}</td>
                          </tr>`
                
                totalPrice += v.price * v.qty;

            })

            table += `<tr>
                        <th colspan="4">Total</th>
                        <td>${totalPrice}</td>
                      </tr>`

            $('#mytable').html(table);
        }
    }



    function count() {
        let itemString = localStorage.getItem('shops');
        if (itemString) {
            let itemsArray = JSON.parse(itemString);
            if (itemsArray != 0){  //index.html မှာ cart noti မှာ 0 ပေးထားတဲ့အတွက်ကြောင့် 
                let count = itemsArray.length;
                $('.nav_home2_text').text(count);
            }
        }
    }
})
