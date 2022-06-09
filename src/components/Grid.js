import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { apiCall } from "../utils"

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import "../css/bar.css"

const defaultColDef = { sortable: true, flex: 1 };

function Grid({ operatorOption, gameTypeOption, slateNameOption }) {

    const [columnDefs, setColumnDefs] = useState([
        { field: 'operatorPlayerName' },  //headerName: "kauaa"
        { field: 'team' },
        { field: "operatorPosition" },
        { field: "operatorSalary" },
        { field: "fantasyPoints" },
    ]);

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (operatorOption, gameTypeOption, slateNameOption) {
            (async function getData() {
                const apiResp = await apiCall("players?operator=" + operatorOption + "&operatorGameType=" + gameTypeOption + "&operatorName=" + slateNameOption);
                setRowData(apiResp.data)
            })();
        }
    }, [slateNameOption]);

    function cellClickedListener(e) {
        console.log(e.data);
    }

    return (
        <div className="ag-theme-alpine-dark table" style={{ height: "500px", width: "900px" }} >
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
    );
}

export default Grid;