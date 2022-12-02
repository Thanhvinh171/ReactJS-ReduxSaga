import React from "react";
import {
  Grid,
  IconButton,
  Icon,
  Button,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from 'material-table';
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation} from 'react-i18next';
// import {getAllEmployees,  createNewEmployees,deleteEmployees} from './EmployeeService'
import EmployeeEditorDialog from "./EmployeeShowDialog";
import { EMPLOYEE_ACTION_TYPE } from "app/redux/types/EmployeeType";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectorEmployee, selectorSetStatusEmployee } from "app/redux/selector/EmployeeSelector";
import { COMMUNE_ACTION_TYPE } from "app/redux/types/CommuneType";
import { selectorCommune } from "app/redux/selector/CommuneSelector";
import { selectorProvince } from "app/redux/selector/ProvinceSelector";
import { PROVINCE_ACTION_TYPE } from "app/redux/types/ProvinceType";
import { selectorDistrict } from "app/redux/selector/DistrictSelector";
import { DISTRICT_ACTION_TYPE } from "app/redux/types/DistrictType";

//Edit, Delete Button
function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return <div>
    <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
      <Icon fontSize="small" color="primary">edit</Icon>
    </IconButton>
    <IconButton onClick={() => props.onSelect(item, 1)}>
      <Icon color="error">delete</Icon>
    </IconButton>
  </div>;
}


class Employee extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      arrEmployee: []
    }
  }
  state = {
    isEditor: false,
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    info: {},
    id: '',
    keyword: ''
  };
  numSelected = 0;
  rowCount = 0;

  handleTextChange = event => {
     this.setState({
        [event.target.name]: event.target.value,
       })
  };

  componentDidMount=()=>{
    let {getAllEmployee,getAllCommune,getAllProvince,getAllDistrict} = this.props;
    getAllEmployee();
    getAllCommune();
    getAllProvince();
    getAllDistrict();
  }


  handleCloseDialog = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenEmployeeEditorDialog: false,
      isEditor: false
    })
  }


  handleDeleteEmployee = (rowData) => {
    this.setState({
      id: rowData.id,
      shouldOpenConfirmationDialog: true
    })
  }

  handleConfirmDelete = async (id) => {
    id = this.state.id;
    let {deleteEmployee} = this.props;
    await deleteEmployee(id);
    this.handleCloseDialog();
  }

  handleShowDialog = () => {
    this.setState({
        shouldOpenEditorDialog: true,
    })
  }
    render(){
      const { t, i18n,employees,communes,provinces,districts, editorEmployee, employeeData} = this.props;
      // console.log("abc", staff);
      let {
        shouldOpenConfirmationDialog,
        shouldOpenEditorDialog,
        isEditor,
        info,
      }= this.state;
      let columns = [
        {
        title: t("staff.code"),
        field: "code",
        align: "left",
        width: "100",
      },
        { 
          title: t("staff.name"), 
          field: "name", 
          align:"left",
          width: "150" },
        { 
          title: t("staff.age"), 
          field: "age", 
          width: "150" 
        },
        { title: 
          t("general.email"), 
          field: "email", align: "left", 
          width: "100" },
        { title: 
          t("staff.phoneNumber"), 
          field: "phone", align: "left", 
          width: "150" },
        {
          title: t("Action"),
          align:"center",
          width:"250",
          render: rowData => <MaterialButton item={rowData} 
           onSelect = {(rowData,method) => {
            if(method === 0){
              this.handleShowDialog(rowData);
              this.setState({
                  id: rowData.id,
                  isEditor: true,
                  info: rowData,
              })
            }else if(method === 1){
              this.handleDeleteEmployee(rowData)
            }
           }}
          />
        }
      ]
     
      return(
        
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: t("Dashboard.manage"), path: "/directory/apartment" },{ name: t('staff.title')}]} />
          </div>
          
          <Grid container spacing={3}>
            <Grid item lg={5} md={5} sm={5} xs={12}>
                <Button
                 className="mb-16 mr-16 align-bottom"
                 variant="contained"
                 color="primary"
                 onClick={this.handleShowDialog}
                >
                  {t('Add')}
                 </Button>
            </Grid>
          </Grid>
            <Grid item xs={12}>
              <div>
              {shouldOpenEditorDialog && (
                  <EmployeeEditorDialog 
                    dataEmployee={employeeData}
                    isEditor={isEditor}
                    info={info}
                    t={t} 
                    i18n={i18n}   
                    handleClose={this.handleCloseDialog}  
                    open={shouldOpenEditorDialog}
                    communes={communes}
                    provinces={provinces}
                    districts={districts}
                    editorEmployee={editorEmployee}
                  />
                )}
               
               {shouldOpenConfirmationDialog && (
                <ConfirmationDialog 
                    title={t("general.confirm")}
                    open={this.state.shouldOpenConfirmationDialog}
                    onConfirmDialogClose={this.handleCloseDialog}
                    onYesClick={this.handleConfirmDelete}
                    text={t('DeleteConfirm')}
                    Yes={t('Yes')}
                    No={t('No')}
                />
               )}

              </div>
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
              title={t('Nhân viên')}
              data={employees}
              columns={columns}
              parentChildData={(row, rows) => {
                var list = rows.find(a => a.id === row.parentId);
                return list;
              }}
              components={{
                Toolbar: props => (
                  <MTableToolbar {...props} />
                ),
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
              }}
              options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: true,
                search: true,
                rowStyle: (rowData, index) => ({
                  backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
                }), 
                maxBodyHeight: '450px',
                minBodyHeight: '370px',
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
                padding: 'dense',
                toolbar: true
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t(
                    "general.emptyDataMessageTable"
                  )}`,
                },
              }}
              >
              </MaterialTable>
            </Grid>
    
        </div>
      )
    }
}

const mapStatetoProps = createStructuredSelector({
    employees: selectorEmployee,
    communes: selectorCommune,
    provinces: selectorProvince,
    districts: selectorDistrict,
    employeeData: selectorSetStatusEmployee
})
const mapDispatchToProps = (dispatch) => {
  return{
    getAllEmployee: () => 
        dispatch({ type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE}),
    deleteEmployee: (id) => 
        dispatch({ type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE, id }),
    getAllCommune: () => 
        dispatch({type: COMMUNE_ACTION_TYPE.GET_ALL_COMMUNE}),
    getAllProvince: () => 
        dispatch({ type:PROVINCE_ACTION_TYPE.GET_ALL_PROVINCE }),
    getAllDistrict: () => 
        dispatch({ type: DISTRICT_ACTION_TYPE.GET_ALL_DISTRICT }),
    editorEmployee: (data, id) => {
      dispatch({
        type: EMPLOYEE_ACTION_TYPE.EDIT_EMPLOYEE,
        data,
        id
      })
    }
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Employee);