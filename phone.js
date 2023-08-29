const loadPhone = async(searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data =await res.json();
    const phones =data.data;
    diaplayPhones(phones,isShowAll)

}
const diaplayPhones = (phones,isShowAll)=>{
    const phoneContainer =document.getElementById('phone-container')
    phoneContainer.textContent =' ';
//display show all button if true are more 12 phone
const showAllButtton =document.getElementById('show-all-container')
if(phones.length > 12 && !isShowAll){
  showAllButtton.classList.remove('hidden')
}else{
  showAllButtton.classList.add('hidden')
}
console.log('is show all',isShowAll)
    //display only first 10 phone
 if(!isShowAll){
  phones =phones.slice(0,12)
 }
    console.log(phones)
    phones.forEach(phone => {
        console.log(phone);
        // 2. creat a div
        const phoneCard =document.createElement('div');
        phoneCard.classList =`card  bg-base-100  shadow-xl   p-4 my-4 `;
        //3. set innerHTML
        phoneCard.innerHTML=`
        
        <figure><img  src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-bod text-center">
          <h2 class="card-title text-center">${phone.phone_name}</h2>
          <p>All mobile phone  show at data</p>
          <div class="card-actions justify-center">
          <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        
        `
        //apend child
        phoneContainer.appendChild(phoneCard)
    });
    //hide loading
    toggoleSpinner(false);
    
}

const handelShowDetails =async (id) =>{
//  console.log('hi', id);
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

 const data =await res.json()
//  console.log(data)

 const phone =data.data;
 showPhoneDetails(phone)
  }

const showPhoneDetails =(phone) =>{
  const phoneName =document.getElementById('phone-name')
  phoneName.innerText=phone.name;
  const showDetailsContainer =document.getElementById('show-details-container')
  showDetailsContainer.innerHTML=`
  <img class="mx-auto" src="${ phone?.image}" alt="">
  <p class=" font-bold">Storage  : <span class="font-semibold">${ phone.mainFeatures.memory}</span> </p>
  <p class="font-bold"> DisplaySize: <span class="font-bold">${ phone.mainFeatures.displaySize}</span> </p>
  <p class="font-bold">chipSet: <span class="font-bold">${ phone.mainFeatures.chipSet}</span> </p>
  <p class="text-2xl">Storage : <span class="font-bold">${ phone.mainFeatures.storage
  }</span> </p>
  <p class="text-2xl">releaseDate
  : <span class="font-bold">${phone?.releaseDate}</span> </p>
  `
  console.log(phone)
  show_details.showModal()
}

const handleSearch=(isShowAll)=>{
  toggoleSpinner(true)
    const searchField =document.getElementById('text-hand')
    const searchText =searchField.value ;
    console.log(searchText)
    loadPhone(searchText,isShowAll)
}
const toggoleSpinner =(isLoading)=>{
  const lodingSpiner =document.getElementById('loding-spinner')
if(isLoading){
  lodingSpiner.classList.remove('hidden')
}else{
  lodingSpiner.classList.add('hidden')
}
}
//handel show all

const handelShowAll =()=>{  
handleSearch(true)
}







