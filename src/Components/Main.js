import { getDefaultNormalizer } from "@testing-library/react";
import react,{useState} from "react";
import { useEffect } from "react/cjs/react.development";
import Card from "./Card";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar} from "recharts";


let API_key="&api_key=c8879130b4b4c046e923b528a86fc1b7";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","Theater","Kids","Drama","Comedy"];
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    //new AVG RATING
    const [averageRating, setAverageRating] = useState(null);

    //new state var to store data for the pieChartData
    const [pieChartData, setPieChartData] = useState([]);
    //new state var to store data for the barChartData
    const [chartType, setChartType] = useState("pie");

    //new state var for highest and lowest ratings
    const [highestRating, setHighestRating] = useState(null);
    const [lowestRating, setLowestRating] = useState(null);




    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    //toggle function to change between pie chart and bar chart
    const toggleChartType = () => {
        setChartType(chartType === "pie" ? "bar" : "pie");
      };
      

    const getData=(movieType)=>{
        if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
            alert("There are currently 20 popular movies");
          
        }
        if(movieType=="Theatre")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
            alert("There are currently 20 theater movies");
        }
        if(movieType=="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
            alert("There are currently 20 kids movies");
        }
        if(movieType=="Drama")
        {
            url=base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
            alert("There are currently 20 Drama movies");
        }
        if(movieType=="Comedie")
        {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
            alert("There are currently 20 Comedy movies");

        }
        setUrl(url);

        //NEW CALL TO getAverageRating
        getAverageRating(movieType);

    }

    //NEW AVG MOVING RATING FUNCTION and Highest / Lowest Rating
    const getAverageRating = (movieType) => {
        let movieUrl = "";
        if (movieType === "Popular") {
          movieUrl =
            base_url +
            "/discover/movie?sort_by=popularity.desc" +
            API_key;
        }
        else if (movieType === "Theatre") {
          movieUrl =
            base_url +
            "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
            API_key;
        }
        else if (movieType === "Kids") {
          movieUrl =
            base_url +
            "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
            API_key;
        }
        else if (movieType === "Drama") {
          movieUrl =
            base_url +
            "/discover/movie?with_genres=18&primary_release_year=2014" +
            API_key;
        }
        else if (movieType === "Comedy") {
          movieUrl =
            base_url +
            "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
            API_key;
        }
      
        fetch(movieUrl)
          .then((res) => res.json())
          .then((data) => {
            //To get average rating
            let totalRating = 0;
            data.results.forEach((movie) => {
              totalRating += movie.vote_average;
            });
            let avgRating = totalRating / data.results.length;
            setAverageRating(avgRating);      
            setPieChartData([
                { name: "Average Rating", value: avgRating },
                { name: "Other", value: 10 - avgRating },
            ]);
            //To get highest/lowest ratings
            let highest = 0;
            let lowest = 10;
            data.results.forEach((movie) => {
            let rating = movie.vote_average;
            if (rating > highest) {
                highest = rating;
            }
            if (rating < lowest) {
                lowest = rating;
            }
            });
            setHighestRating(highest);
            setLowestRating(lowest);

          });
      };
      


    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=c8879130b4b4c046e923b528a86fc1b7&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return(
        <>
            <div className="header">
            <button onClick={toggleChartType}>Toggle AVG Rating Chart Type</button>

                <nav>
                    <ul>
                        {
                            arr.map((value,pos)=>{
                                return(
                                    <li><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                       
                    </ul>
                </nav>
              
                <div className="avgrate">
                {averageRating && (
                    <>
                        <p>Average rating for this category: {averageRating.toFixed(2)}</p>
                        {chartType === "pie" ? (
                                <PieChart width={300} height={300}>
                                    <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                    >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#ccc"} />
                                    ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                                ) : (
                                <BarChart width={300} height={300} data={pieChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                                )}

                                </>
                            )}

                </div>
                <div className="highlowrate">
                
                    {highestRating && lowestRating && (
                    <BarChart width={300} height={200} data={[{ name: "Ratings", highest: highestRating, lowest: lowestRating }]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="highest" fill="#8884d8" />
                        <Bar dataKey="lowest" fill="#82ca9d" />
                    </BarChart>
                    )}

                </div>
                
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name, Genre, or Actor " 
                        className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos}/>
                        )
                    })
                }
            </div>

          

        </>
    )
}
export default Main;