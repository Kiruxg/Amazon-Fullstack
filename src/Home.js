import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home_imageContainer">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/IMDbTV/gateway/theoutpost/GW_DHERO_TheOutpost_1500x600_EN-US_5538_v2._CB407273330_.jpg"
          alt=""
        />
      </div>
      <div className="home__row">
        <Product
          id={12345}
          price={20}
          rating={4}
          title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses"
          image="https://miro.medium.com/max/875/1*zxtMIuwC0eMGDAQ8gkCtcg.jpeg"
        />
        <Product
          id={33452}
          price={240}
          rating={3}
          title="Kitchenaid Professional 600 Stand Mixer 6 quart, Empire Red (Renewed)"
          image="https://images-na.ssl-images-amazon.com/images/I/61hNBQpikbL._AC_SL1000_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={66653}
          price={15}
          rating={5}
          title="Yankee Candle Small Tumbler Candle, French Vanilla"
          image="https://images-na.ssl-images-amazon.com/images/I/81uxV33yujL._AC_SL1500_.jpg"
        />
        <Product
          id={87682}
          price={220}
          rating={4}
          title="Bose SoundLink Around Ear Wireless Headphones II - Black"
          image="https://images-na.ssl-images-amazon.com/images/I/71jDdUuRi8L._AC_SL1500_.jpg"
        />
        <Product
          id={50081}
          price={75}
          rating={5}
          title="Echo Plus (2nd Gen) - Premium sound with built-in smart home hub - Sandstone"
          image="https://images-na.ssl-images-amazon.com/images/I/61KgbvNhh6L._AC_SL1000_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={39864}
          price={1200}
          rating={4}
          title="Samsung 49-Inch CRG9 Curved Gaming Monitor (LC49RG90SSNXZA)"
          image="https://images-na.ssl-images-amazon.com/images/I/71916r38cNL._AC_SL1500_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
