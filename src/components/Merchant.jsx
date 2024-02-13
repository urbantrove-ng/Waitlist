import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { patch } from "../services/api";
import { productsData, serviceData } from "../constants/data";

export default function Merchant() {
  //   const userRef = useRef();
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsData[0])
  const [services, setServices] = useState(serviceData[0])
  const [selectCategory, setSelectCategory] = useState('service')
  const [searchParams,setSearchParams] = useSearchParams()
  const userId = searchParams.get('id')

  function handleCategory(e){
    setSelectCategory(e.target.value);
  }
  function handleProduct(e){
    setProducts(e.target.value)
  }
  function handleService(e){
    setServices(e.target.value)
  } 

  async function successful(e) {
  e.preventDefault()
  console.log(selectCategory,products,services)
   const response = await patch('/api/v1/auth/waitlist',{
      id:userId,
      category:selectCategory === "product"?products:services,
      merchantCategory:selectCategory
    })
if(response&& typeof response !== 'undefined'){
  return navigate("/success")
}
  }
  return (
    <div className="mt-[2rem] lg:mt-0  text-center grid justify-center items-center gap-[2rem] lg:gap-[1rem] text-[#444B59] px-[10rem] lg:px-0 py-[1rem] pb-[3rem]">
      <h1 className="text-[2rem] lg:text-[1.5rem] uppercase font-[700]">
        Hello Merchant, ready to make more money?
      </h1>
      <form action="" className="grid gap-[1rem]">
        <label className="text-start text-[#475569] font-[400] mb-[-1rem]" htmlFor="">
          Product or Service?
        </label>
        <div className="grid justify-center">
          <select
            className="w-[25rem] lg:h-[3rem] bg-white lg:w-[20rem] py-[1rem] px-[1rem] rounded-[50px] border-[#647C0C] border-[1px] focus:outline-none"
            name="category"
            id="category"
            value={selectCategory}
            onChange={handleCategory}
          >
            <option value="service">Service</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div className="grid justify-center">
        <label className="text-start text-[#475569] font-[400]" htmlFor="">
          Category
        </label>
          {selectCategory === "product" ? (
            <select
            className="w-[25rem] lg:h-[3rem] bg-white lg:w-[20rem] py-[1rem] px-[1rem] rounded-[50px] border-[#647C0C] border-[1px] focus:outline-none"
            name="products"
            id="products"
            value={products}
            onChange={handleProduct}
          >
            {productsData.map((product,index)=>{
              const {name, value} = product;

              return <option key={index} value={value}>{name}</option>
            })}
          </select>
          ) : (
            <select
            className="w-[25rem] lg:h-[3rem] bg-white lg:w-[20rem] py-[1rem] px-[1rem] rounded-[50px] border-[#647C0C] border-[1px] focus:outline-none"
            name="products"
            id="products"
            value={services}
            onChange={handleService}
          >
            {serviceData.map((service,index)=>{
              const {name, value} = service;

              return <option key={index} value={value}>{name}</option>
            })}
          </select>
          )}
        </div>
        <button
          onClick={successful}
          className="bg-[#647C0C] text-[1.1rem] mt-[1rem] w-[25rem] lg:w-[20rem] py-[0.7rem] rounded-[50px] text-[#fff] flex m-auto justify-center"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
