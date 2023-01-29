import { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { GiDrop } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";

type IWeather = {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country?: string;
  };
  name: string;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<IWeather>({} as IWeather);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchApi = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${import.meta.env.VITE_REACT_API_KEY}&lang=pt_br`);
    const dataJson = await res.json();
    setData(dataJson);
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    fetchApi();
    setSearch("");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      fetchApi();
      setSearch("");
    }
  };

  return (
    <div className="h-screen font-primary flex justify-center items-center bg-gradient-to-b from-sky-400 to-sky-200 p-5 max-sm:p-0">
      <div className="w-[600px] h-[550px] max-md:w-5/6 flex flex-col justify-between gap-5 bg-gray-800 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-10 max-sm:p-5">
        <div className="w-full flex flex-col items-center gap-5">
          <h1 className="text-3xl text-white font-bold flex gap-2 justify-center items-center max-sm:text-2xl">
            <TiWeatherPartlySunny className="text-5xl max-sm:text-4xl" />
            <div>
              <span className="text-sky-700">Weather</span>Web
            </div>
          </h1>
          <hr className="text-white w-full border-2" />
        </div>
        <div className="h-full flex flex-col justify-around items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {data.name ? data.name : "Cidade"} | {data.sys?.country ? data.sys?.country : "País"}
            </h3>
          </div>
          <div className="text-6xl font-bold text-sky-700"> {data.main?.temp ? data.main.temp.toFixed() : "0"} °C</div>
          <div className="flex justify-center items-center">
            <h4 className="text-2xl font-bold text-white">
              {data.weather?.[0]?.description ? data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1) : "Clima"}
            </h4>
            {data.weather?.[0].icon ? <img src={`https://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`} /> : <img src={`https://openweathermap.org/img/wn/03d.png`} />}
          </div>
          <div className="flex gap-20 text-xl text-white font-semibold">
            <div className="flex justify-center items-center gap-2">
              <GiDrop className="text-sky-700" />
              {data.main?.humidity ? data.main?.humidity : ""}%
            </div>
            <div className="flex justify-center items-center gap-2">
              <FaWind className="text-sky-700" />
              {data.wind?.speed ? data.wind?.speed.toFixed() : ""}m/s
            </div>
          </div>
        </div>
        <div className="flex  gap-2 w-full">
          <input
            type="text"
            onKeyDown={handleOnKeyDown}
            onChange={handleChange}
            value={search}
            className="w-full h-10 rounded-md outline-none px-5 py-6"
            placeholder="Insira o nome de uma cidade"
          />
          <button onClick={handleClick} className="h-auto w-20 flex justify-center items-center cursor-pointer bg-sky-700 rounded-md ">
            <FaSearch className="text-3xl text-white rounded-md" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
