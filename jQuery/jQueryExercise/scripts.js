$(document).ready(function(){

        getData();
        count();

    $('.addToCart').click(function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        // console.log(id,name,price);

        let items = {
            //key:value
            id : id,
            name : name,
            price : price,
            qty : 1
        }
        
        let itemsString = localStorage.getItem('shops');
        let itemsArray;
        if (itemsString == null){
            itemsArray = [];
        }else{
            itemsArray = JSON.parse(itemsString);
        }

        let status = false;
        $.each(itemsArray,function(i,v){
            if(v.id == id){
                v.qty++;
                status = true;
            }     
        })

        if(status == false){
            itemsArray.push(items);
        }

        let dataString = JSON.stringify(itemsArray);
        localStorage.setItem('shops',dataString);

        count();
        
    })

    function getData(){
        let dataString = localStorage.getItem('shops');
        if(dataString){
            let dataArray = JSON.parse(dataString);
            // console.log(dataArray);
            

        let table = "";
        let j = 1 ;
        let totalPrice = 0;

        $.each(dataArray,function(i,v){

            table += `<tr>
                        <td>${j++}</td>
                        <td>${v.name}</td>
                        <td>${v.price}</td>
                        <td><button style="width:20px; height:20px; margin-right:5px;" class="max" data-key=${i}>+</button>${v.qty}<button style=" width:20px; height:20px; margin-left:5px;" class="min" data-key=${i}>-</button></td>
                        <td>${v.qty * v.price}</td>
                      </tr>`

        totalPrice += v.qty * v.price;
        })

        table += `<tr>
                    <th colspan="4">Total</th>
                    <td>${totalPrice}</td>
                 </tr>`

        $('#mytable').html(table);

        }
    }

    function count(){
        let dataString = localStorage.getItem('shops');
        if(dataString){
            let dataArray = JSON.parse(dataString);

            if(dataArray != null){
                let count = dataArray.length;
            $('.nav_home2_text').text(count);
            }
        }
    }

    $('#mytable').on('click','.min',function(){
        let key = $(this).data('key');
        // alert(key);
        
        let dataString = localStorage.getItem('shops');
        if(dataString){
            let dataArray = JSON.parse(dataString);

            $.each(dataArray,function(i,v){
                if(i == key){
                    v.qty--;
                }

            if (v.qty == 0){
                dataArray.splice(key,1);
            }

            let dataString = JSON.stringify(dataArray);
            localStorage.setItem('shops',dataString);

            getData();
            count();
            })
        }

    })

    $('#mytable').on('click','.max',function(){
        let key = $(this).data('key');
        // alert(key);

        let dataString = localStorage.getItem('shops');
        if(dataString){
            let dataArray = JSON.parse(dataString);

            $.each(dataArray,function(i,v){
                if(i == key){
                    v.qty++;
                }
            
            let dataString = JSON.stringify(dataArray);
            localStorage.setItem('shops',dataString);

            getData();
            count();
            })
        }
    })


    $('#order_now').click(function(){
        let ans = confirm('Are you sure order?');
        if(ans){
            localStorage.removeItem('shops');
            window.location.href = 'index.html';
        }
    })
})