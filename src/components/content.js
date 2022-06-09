import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { apiCall } from "../utils"

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import "../css/content.css"

import playerImg from "../img/player.png"


const columnDefs = [
    { field: 'operatorPlayerName', headerName: "Name" },
    { field: 'team' },
    { field: "operatorPosition", headerName: "Position" },
    { field: "operatorSalary", headerName: "Salary" },
    { field: "fantasyPoints", headerName: "Points" },
];

const defaultColDef = { sortable: true, flex: 1 };

function DropDownList() {

    const [operatorOptions, setOperatorOptions] = useState([]);
    const [gameTypeOptions, setGameTypeOptions] = useState([]);
    const [slateNameOptions, setSlateNameOptions] = useState([]);

    const [selectedOperatorOption, setSelectedOperatorOption] = useState("");
    const [selectedGameTypeOption, setSelectedGameTypeOption] = useState("");
    const [selectedSlateNameOption, setSelectedSlateNameOption] = useState("");

    const [playerName, setPlayerName] = useState("");
    const [playerPoints, setPlayerPoints] = useState("");

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        (async function getData() {
            const apiResp = await apiCall("operator");
            setOperatorOptions(apiResp.data)
        })();
    }, []);

    useEffect(() => {
        if (selectedOperatorOption, selectedOperatorOption, selectedSlateNameOption) {
            (async function getData() {
                const apiResp = await apiCall("players?operator=" + selectedOperatorOption + "&operatorGameType=" + selectedGameTypeOption + "&operatorName=" + selectedSlateNameOption);
                setRowData(apiResp.data)
            })();
        }
    }, [selectedSlateNameOption]);

    async function handleSelectOperator(e) {
        setSelectedOperatorOption(e.target.value)

        const apiResp = await apiCall("operatorGameType?operator=" + e.target.value);
        setGameTypeOptions(apiResp.data)
    }

    async function handleSelectGameType(e) {
        setSelectedGameTypeOption(e.target.value)

        const apiResp = await apiCall("operatorName?operator=" + selectedOperatorOption + "&operatorGameType=" + e.target.value);
        setSlateNameOptions(apiResp.data)
    }

    async function handleSlateName(e) {
        setSelectedSlateNameOption(e.target.value)
    }

    function cellClickedListener(e) {
        console.log(e.data);
        setPlayerName(e.data.operatorPlayerName)
        setPlayerPoints(e.data.fantasyPoints)
    }

    return (
        <div>
            <div id='dropDownList'>
                <select onChange={handleSelectOperator}>
                    <option>Select Operator</option>
                    {
                        operatorOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))
                    }
                </select>

                <select onChange={handleSelectGameType}>
                    <option>Select Game Type</option>
                    {
                        gameTypeOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))
                    }
                </select>

                <select onChange={handleSlateName}>
                    <option>Select Slate Name</option>
                    {
                        slateNameOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))
                    }
                </select>
            </div>

            <div id='playerDetails'>

                <div className="ag-theme-alpine-dark table" style={{ height: "620px", width: "900px" }} >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}

                        defaultColDef={defaultColDef}
                        animateRows={true}
                        rowSelection='multiple'
                        onCellClicked={cellClickedListener}

                        pagination={true}
                        // paginationPageSize= {9}
                        paginationAutoPageSize={true}
                    />
                </div>

                <div id='playerProfle'>
                    <img src={playerImg}  style={playerName ? {}: {display: "none"}} />
                    <div id='aboutPlayer' style={playerName ? {}: {display: "none"}} >
                        <div id='name'>{playerName}</div>
                        <div id='point'>{playerPoints ? playerPoints: "N/A"}</div>
                        <div id='pointText'>Points</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DropDownList;