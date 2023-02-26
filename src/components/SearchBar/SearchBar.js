import { useState } from "react";

const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <form onSubmit={() => props.search(searchQuery)}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
        <input type="submit"/>   
      </form>
    )
}

export { SearchBar }