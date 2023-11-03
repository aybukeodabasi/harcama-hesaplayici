// htmldden gelen elemanlar
const nameInput=document.getElementById("name-input")
const priceInput=document.getElementById("price-input")
const addBtn=document.querySelector("#add-btn")
const listArea = document.getElementById("list")
const statusCheckbox=document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info")
const userInput = document.getElementById("user-input")
const select = document.querySelector("select")



// izlediğimiz olaylar

addBtn.addEventListener("click",addExpense)
listArea.addEventListener("click",handleUpdate)
userInput.addEventListener("input",saveUser)
document.addEventListener("DOMContentLoaded",getUser)
select.addEventListener("change",handleFilter)

// toplamın değerini burada tutacağız

let sum = 0;

function updateSum(price){

    sum+= Number(price)

    // html deki toplam bilgi alanını güncelleme

    sumInfo.innerText = sum;
    
}

function addExpense(event){
    //sayfayı yenilemeyi engelleme
    event.preventDefault();



    // inputların biri bile  boşsa alert ve ve fonstiyonu durdur
    if(!nameInput.value || !priceInput.value){
        alert("lütfen formu doldurunuz");
        return;
    }

    //inputlar dolu ise bir kart oluştur ve htmlye gönder
    //a-div oluşturma

    const expenseDiv = document.createElement("div");

    //b-dive class ekleme

    // eğer ki ödendi checkbox'ına tıklandıysa ödendi classı ekle

    if(statusCheckbox.checked===true){
        expenseDiv.classList.add("payed");
    }

    expenseDiv.classList.add("expense"); 
    // expenseDiv.classlist="expense"; (ikinci yöntem)

    //c- içerisindeki HTML yi belirleme

    expenseDiv.innerHTML= `
    <h2 class="name">${nameInput.value}</h2>
    <h2 class="price">${priceInput.value}</h2>
    <div class="btns">
        <img id=pay src="/icons/icons8-pay-100.png">
        <img id=delete src="/icons/icons8-delete-100 (1).png" alt="">
    </div>`;

    // d- oluşan elemanı html ye gonderme

    listArea.appendChild(expenseDiv);


    // toplam alanını güncelleme
    updateSum(priceInput.value)

    // formu temizleme

    nameInput.value="";
    priceInput.value="";
    statusCheckbox.checked=false;

}

// listedeki bir elemana tıklayınca çalısır

function handleUpdate(event){
    // tıklanılan eleman

    const ele = event.target;

    // yalnızca silme işleminde calısacak kod

    if(ele.id === "delete"){
        const parent = ele.parentElement.parentElement

        parent.remove();

        // toplam bilgisini güncelleme

        const price = parent.querySelector(".price").textContent
        updateSum(-Number(price) )

    }

}

// kullanıcıyı local a kaydetme

function saveUser(event){
    localStorage.setItem("username",event.target.value);
}

//kullnıcı localde varsa onu alma

function getUser(){
    // localden ismi al  isim kaydedilmemişse null yerine "" olsun
    const username=localStorage.getItem("username") || "";

    // kullanıcı ismini inputa aktar
    userInput.value = username;
}


// filtreleme kısmı

function handleFilter(event){
    const selected =event.target.value;
    const items=list.childNodes;


    items.forEach((item) => {

        switch(selected){

            case "all":
                item.style.display="flex"
                break
    
            case "payed" :
                if(item.classList.contains("payed")){
                    item.style.display="flex"
                }else{
                    item.style.display="none"
                }
                break
    
            case "not-payed":
                if(!item.classList.contains("payed")){
                    item.style.display="flex"
                }else{
                    item.style.display="none"
                }
                break
        
        }
        
    });



}
