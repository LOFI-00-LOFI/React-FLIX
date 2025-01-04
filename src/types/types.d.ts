interface Movie {
    id: number;
    title?: string;
    backdrop_path?: string;
    overview?: string;
}

interface GenreWithMovies {
    id: number;
    name: string;
    movies: Movie[];
}

interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Belongstocollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Productioncompany[];
    production_countries: Productioncountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Spokenlanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  interface Spokenlanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  interface Productioncountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface Productioncompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
  }
  
  interface Genre {
    id: number;
    name: string;
  }
  
  interface Belongstocollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }



  interface TMDBRespones<T>{
    results: T[];
  }

interface Genre{
    id:number;
    name:string

}

interface MoviesWithGenre{
    movies: Movie[];
    id:number;
    name:string;
}


interface Trailer {
  key:string
}

interface CardState{
  isHovered?:boolean;
  cardId ?: number | string | null;
  position ?: {x:number,y:number};
  dimensions ?: {width:number,height:number};
  item?: Movie | null;
}

interface ModalState {
  isOpen : boolean;
  videoId:string;
  movieId:string;
  movieData : MovieDetails | null
  loading:boolean;
  error: string | null;
}