import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import Error from "../Components/Error";
import NoData from "../Components/NoData";
/**
 * Homepage layout.
 * @param Modal : Modal component to be displayed.
 * @param fetch: backend endpoint to be fetched from.
 * @param Item : each individual item's component to be displayed.
 * @param search : search function applied when search bar isn't empty. 
 * @param toolbar: tools to be displayed next to / below search bar. 
 * @param sortData : sorting data function to be used. 
 * @return a  homepage with: search bar, additional toolbar(s), each individual item displayed, a floating action button that opens up a modal.
 */
export default function HomeTemplate({
    Modal,
    fetch,
    Item,
    search: searchFunction,
    toolbar,
    sortData
}) {
    const [data, setData] = useState([]);
    const [add, setAdd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
 
 
    const { id } = useParams();
    const [search, setSearch] = useState(""); 
 

    useEffect(() => {
        axios
            .get(fetch)
            .then(res => { 
                setData(sortData ? sortData(res.data || []) : res.data || []);
                setLoading(false);
            })
            .catch(e => { 
                setLoading(false);
                setError(true);
            });
    }, [fetch, sortData]);

    return (
        <>
            <div
                style={{
                    textAlign: "center",
                    width: "30%",
                    padding: 10,
                    margin: "auto"
                }}>
                <TextField //searchbar 
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="Search..."
                    
                    helperText={search.length === 0
                        ? 'Showing ' + data.length + ' results' 
                        : 'Showing ' + searchFunction(data, search).length   + ' results'}
                    value={search}
                    onChange={e => { 

                        setSearch(e.target.value); 
                    }}
                />
                {/* additional toolbars: */}
                {toolbar} 
            </div>

            {loading ? ( //loading state
                <Spinner />
            ) : error ? ( //error state
                <Error className="homepage-alert" />
            ) : data.length > 0 ? ( //there are some data to be displayed.
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "33% 33% 33%",
                        padding: "auto",
                        justifyContent: "center",
                        alignContent: "center",
                        rowGap: "5%",
                    }}>
                    {search.length === 0
                        ? data.map(v => <Item key={v._id} {...v} />)
                        : searchFunction(data, search).map(v => (
                              <Item key={v._id} {...v} />
                          ))}
                </div>
            ) : (
                //no data state
                <NoData className="homepage-alert" />
            )}
            {/* floating action button on bottom right: */}
            <Fab
                aria-label="Add"
                style={{ position: "sticky", bottom: "10%", left: "90%" }}
                color="primary"
                onClick={() => setAdd(true)}>
                <AddIcon />
            </Fab>
            {(id || add) && <Modal id={id} add={add} />}
        </>
    );
}
