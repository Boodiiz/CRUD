

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var defaultSelections = document.getElementById("defaultSelection");
var addProductButton = document.getElementById("addProductButton");
var updateProductButton = document.getElementById("UpdateProductButton");


var containerProductsElement = document.getElementById("containerProducts");

var updatedProductIndex;

// Regex
var productNameRegex = /^[A-Z].+$/;
var productPriceRegex = /^[1-9][0-9]*$/;
var productCategoryRegex = /^Laptop|Camera|Mobile Phone|Printer|TV$/;
var productDescriptionRegex = /^.{3,}$/

// Element.value =

var productslist=[];

if(localStorage.getItem("ourProducts") != null)
{
   productslist = JSON.parse(localStorage.getItem("ourProducts"));
   displayProducts(productslist);
}



function addProduct()
{
  
 if(isValidProductField(productNameRegex, productNameInput) &
  isValidProductField(productPriceRegex, productPriceInput) &
  isValidProductField(productCategoryRegex, productCategoryInput) &
  isValidProductField(productDescriptionRegex, productDescriptionInput) &
  isValidProductImage())
 {
  var product =
  {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name
  }

  productslist.push(product);

  localStorage.setItem("ourProducts", JSON.stringify(productslist))
  // console.log(product.productImage);
  
  console.log(productslist);
  resetProductInputs()
  displayProducts(productslist);
 }
 else
 {
  //window.alert("Please enter valid inputs");
 }
}

function resetProductInputs()
{
  productNameInput.value = null;
  productPriceInput.value = null;
  defaultSelections.selected = true;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  // gda3na
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}

function displayProducts(arr)
{
  var containerElement= ''
  for (var i = 0 ; i < arr.length ; i++)
  {
    containerElement += `<div class="col">
                          <div class="border shadow-sm p-2">
                            <div class="product-image-container mb-5">
                              <img src="./images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
                            </div>
                            <h3 class="fs-5">${arr[i].productName}</h3>
                            <p class="fs-6 text-secondary">${arr[i].productDescription}</p>
                            <p><span class="fw-semibold">Category:</span> ${arr[i].productCategory}</p>
                            <div class="d-flex justify-content-between pe-3">
                              <p class="fw-semibold">${arr[i].productPrice} EGP</p>
                              <div>
                                <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can fs-5 text-danger"></i>
                                <i onclick="moveProductsDetailsToInput(${i})" class="fa-solid fa-pen-to-square fs-5 text-success"></i>
                              </div>
                            </div>
                          </div>
                        </div>`
  }

  containerProductsElement.innerHTML = containerElement;

}

function deleteProduct(deletedIndex)
{
    productslist.splice(deletedIndex,1);
    localStorage.setItem("ourProducts" , JSON.stringify(productslist))
    displayProducts(productslist);
}

function searchByProductName(term)
{
  var filteredArray=[];
  for(var i=0; i<productslist.length ; i++)
  {
    if(productslist[i].productName.toLowerCase().includes(term.toLowerCase()))
    {
      filteredArray.push(productslist[i])
    }
  }
  displayProducts(filteredArray);
}

function moveProductsDetailsToInput(index)
{
  productNameInput.value = productslist[index].productName;
  productPriceInput.value = productslist[index].productPrice;
  productCategoryInput.value = productslist[index].productCategory;
  productDescriptionInput.value = productslist[index].productDescription;

  addProductButton.classList.replace("d-block", "d-none");
  updateProductButton.classList.replace("d-none", "d-block");

  updatedProductIndex = index;

}

function updateProduct()
{

  productslist[updatedProductIndex].productName = productNameInput.value;
  productslist[updatedProductIndex].productPrice = productPriceInput.value;
  productslist[updatedProductIndex].productCategory = productCategoryInput.value;
  productslist[updatedProductIndex].productDescription = productDescriptionInput.value;
  
  if (productImageInput.files[0] != undefined) //(productImageInput.files.length != 0)
  {
    productslist[updatedProductIndex].productImage = productImageInput.files[0].name
  }

  displayProducts(productslist);
  localStorage.setItem("ourProducts", JSON.stringify(productslist))
  
  resetProductInputs();
  addProductButton.classList.replace("d-none", "d-block");
  updateProductButton.classList.replace("d-block", "d-none");
}



function isValidProductField(regex, element)
{
  if(regex.test(element.value))
  {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none")
    return true;
  }
  else
  {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid")
    element.nextElementSibling.classList.replace("d-none", "d-block")
    return false;
  }
}
function isValidProductImage()
{
  if(productImageInput.files.length != 0)
  {
    productImageInput.classList.add("is-valid");
    productImageInput.classList.remove("is-invalid");
    productImageInput.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  }
  else
  {
    productImageInput.classList.add("is-invalid");
    productImageInput.classList.remove("is-valid");
    productImageInput.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}


