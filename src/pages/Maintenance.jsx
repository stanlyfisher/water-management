import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import App from "./PareetoLine";
import Pareto from "./ParetoData";
import { useSelector, useDispatch } from "react-redux";
import { fetchPart } from "../features/part/partSlice";
import { deletePartListData } from "../features/part/partSlice";
import { dropdown } from "bootstrap-css";

function Maintenance() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [dropDown, UseDropDown] = useState("");
  const partValue = useSelector((state) => state.part.partValue);
  useEffect(() => {
    dispatch(fetchPart());
  }, []);

  const navigate = useNavigate();
  const deleteData = (id) => {
    dispatch(deletePartListData(id));
  };

  let inputHandler = (e) => {
    var dataInput = e.target.value;
    setInputText(dataInput);
  };

  let doprDown = (e) => {
    var dataInput1 = e.target.value;
    UseDropDown(dataInput1);
  };

  const renderPartList = () => {
    const filterData = partValue.filter((el) => {
      if (inputText == "" && dropDown == "") {
        return el;
      }
      if (!dropDown == "" && inputText == "") {
        return el.Line.includes(dropDown);
      }
      if (!inputText == "" && dropDown == "") {
        return el.Mesin.includes(inputText);
      }
      if (!dropDown == "" && !inputText == "") {
        return el.Mesin.includes(inputText) && el.Line.includes(dropDown);
      }
    });

    return filterData.map((partdata) => {
      return (
        <Tr>
          <Td>{partdata.Mesin}</Td>
          <Td>{partdata.Line}</Td>
          <Td>{partdata.Pekerjaan}</Td>
          <Td>{moment(partdata.Tanggal).format("DD/MM/YYYY")}</Td>
          <Td>{partdata.Quantity}</Td>
          <Td>{partdata.Unit}</Td>
          <Td>{partdata.Pic}</Td>
          <Td>{partdata.Tawal}</Td>
          <Td>{partdata.Tahir}</Td>
          <Td>{partdata.Total}</Td>
          <Td>
            <Button
              colorScheme="green"
              onClick={() => {
                navigate(`/createedite/${partdata.id}`);
              }}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => deleteData(partdata.id)}>
              Delet
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <div>
      <div>
        <h1 class="text-center text-4xl antialiased hover:subpixel-antialiased; p-8">
          PARETO MACHINE BREAKDOWN
        </h1>
        <App />
        <Pareto />
      </div>

      <Stack
        className="flex flex-row justify-center   "
        direction="row"
        spacing={4}
        align="center"
      >
        <div className="main">
          <h1>Search Mesin</h1>
          <div className="search">
            <input
              onChange={inputHandler}
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <h2>Line</h2>
          <Select placeholder="Select Line" onChange={doprDown}>
            <option value="Line1">Line 1</option>
            <option value="Line2">Line 2</option>
            <option value="Line3">Line 3</option>
            <option value="Line4">Line 4</option>
          </Select>
        </div>

        <div>
          <br />
          <Button
            className="w-40"
            colorScheme="blue"
            onClick={() => {
              navigate(`/createnew`);
            }}
          >
            Create New
          </Button>
        </div>
      </Stack>
      <br />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Mesin</Th>
              <Th>Line</Th>
              <Th>Pekerjaan</Th>
              <Th>Tanggal</Th>
              <Th>Quantity</Th>
              <Th>Unit</Th>
              <Th>Pic</Th>
              <Th>Awal Pengerjaan</Th>
              <Th>Ahir Pengerjaan</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderPartList()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Maintenance;
