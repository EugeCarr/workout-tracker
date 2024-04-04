"use server"
import Image from "next/image";
import "./styles.css";
import  SiteBanner from "./components/SiteBanner"
import { MainpageCard } from "./components/MainpageCard";


const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <MainpageCard
        title="Workout Plans"
        photoSrc="https://www.shutterstock.com/image-vector/weightlifting-dumbbell-training-icon-260nw-551668651.jpg"
        description="
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec neque non sapien aliquet condimentum. Nam molestie est a nibh hendrerit sodales. Sed eget ipsum augue. Nullam a dictum ante. Curabitur vitae metus eget libero ultricies condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur vitae cursus nunc.
        
        Praesent sed dictum orci. Aliquam congue tempus eros, et pharetra sapien gravida congue. Aliquam malesuada enim at neque convallis, at viverra erat viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper vel erat rutrum fringilla. Quisque neque neque, consectetur in porttitor sit amet, ultricies vel odio. Nullam nec augue neque."
        pageRoute="/myWorkouts"
      >

      </MainpageCard>
    </div>
  );
}

export default Home;