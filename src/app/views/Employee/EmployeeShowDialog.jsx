import React from "react";
import {
    Grid,
    IconButton,
    Icon,
  } from "@material-ui/core";
  import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import '../../../styles/views/_loadding.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/views/_style.scss';
//import { updateEmployees,getAllCommunes, getAllDistricts,getAllProvinces,createNewEmployees} from './EmployeeService'


toast.configure({
    autoClose: 1000,
    draggable: false,
    limit: 3
  });
  function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

class EmployeeEditorDialog extends React.Component{
    constructor(props){
        super(props);

    }
        state = {
            id:'',
            code: '',
            name: '',
            age: '',
            email: '',
            phone: '',
            province: {},
            commune: {},
            district: {},
        }
    componentDidMount(){
        let {info, isEditor} = this.props;
        if(isEditor){
            this.setState({
                id: info.id,
                code:info.code,
                name: info.name,
                age: info.age,
                email: info.email,
                phone: info.phone,
            })
        }    
    }

    handleOnChange = (e) => {
       this.setState({
        [e.target.name]: e.target.value,
       })
    }
/*
*/
    selectProvince= (NewProvinceValue) =>{
        this.setState({
            province: NewProvinceValue,
        })
    }
    selectDistrict= (NewDistrictValue) =>{
        this.setState({
            district: NewDistrictValue,
        })
    }
    selectCommune= (NewCommuneValue) =>{
        this.setState({
            commune: NewCommuneValue,
        })
    }
       
    render(){
        let {
            handleClose,t,isEditor,info, communes,provinces,districts,editorEmployee,dataEmployee
        }=this.props
        //console.log("bcd", dataEmployee);
        let {
            id,
            code,
            name,
            age,
            email,
            phone,
            province,
            district,
            commune,
            
        } = this.state;

        if(dataEmployee ?.code == 200){ 
            handleClose();
        }
       
        const  handleEditEmployee = (data) => {
            data = this.state;
            if(!id){
                editorEmployee(data);
            }else{
                editorEmployee(data, data.id);
            }
        }
        return(
           <div>
              <Dialog open={this.props.open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth={true}>
                <DialogTitle id="draggable-dialog-title">
                    <span className="mb-20 styleColor">{isEditor ? `Update nhân viên` : `Thêm mới nhân viên`}</span>
                    <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}>
                        <Icon 
                        color="error"
                        title="Close">
                        close
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <ValidatorForm ref="form" style = {{
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column"
                }}>
                <DialogContent dividers>
                   <Grid className="mb-16" container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator 
                            className="w-100 mb-16"
                            label={
                                <span>
                                    <span style={{ color: "red" }}>* </span>
                                    Mã nhân viên
                                </span>
                            }
                            type="text"
                            name="code"
                            onChange={ this.handleOnChange}
                            inputProps={{maxLength: 10 }}
                            validators={isEditor ? null:["required","matchRegexp:([a-zA-Z0-9]{6,10})$"]}
                            errorMessages={[t("general.required"),t("general.error_code")]}
                            variant="outlined"
                            size="small"
                            value={ isEditor ? null : code}
                            defaultValue={isEditor ? info.code: code}
                        >
                        </TextValidator>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator 
                            className="w-100 mb-16"
                            label={
                                <span>
                                    <span style={{ color: "red" }}>* </span>
                                    Họ và tên
                                </span>
                            }
                            type="text"
                            name="name"
                            onChange={this.handleOnChange}
                            validators={isEditor ? null:["required"]}
                            errorMessages={[t("general.required")]}
                            variant="outlined"
                            size="small"
                            value={isEditor ? null : name}
                            defaultValue={info ? info.name : name}
                        >
                        </TextValidator>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator 
                            className="w-100 mb-16"
                            label={
                                <span>
                                    <span style={{ color: "red" }}>* </span>
                                    Tuổi
                                </span>
                            }
                            type="number"
                            name="age"
                            onChange={this.handleOnChange}
                            validators={isEditor ? null:["required","minNumber:0","maxNumber:100"]}
                            errorMessages={[t("general.required"),t("general.ageError"),t("general.errorage")]}
                            variant="outlined"
                            size="small"
                            value={isEditor ? null :age}
                            defaultValue={isEditor ? info.age: age}
                        >
                        </TextValidator>
                    </Grid>
                     
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator 
                            className="w-100 mb-16"
                            label={
                                <span>
                                    <span style={{ color: "red" }}>* </span>
                                    Email
                                </span>
                            }
                            type="email"
                            name="email"
                            onChange={this.handleOnChange}
                            validators={isEditor ? null:["required","isEmail"]}   
                            errorMessages={[t("general.required"),t("general.error")]}
                            variant="outlined"
                            size="small"
                            value={isEditor ? null :email}
                            defaultValue={isEditor ? info.email: email}
                        >
                        </TextValidator>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator 
                            className="w-100 mb-16"
                            label={
                                <span>
                                    <span style={{ color: "red" }}>* </span>
                                    Số điện thoại
                                </span>
                            }
                            type="number"
                            name="phone"
                            onChange={this.handleOnChange}
                            validators={isEditor ? null:["required","matchRegexp:(^[0-9]{10})$"]}
                            errorMessages={[t("general.required"),t("general.errorPhone")]}
                            variant="outlined"
                            size="small"
                            value={isEditor ? null : phone}
                            defaultValue={isEditor ? info.phone: phone}
                        />
                        
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        {provinces && (
                            <Autocomplete 
                                style={{width: "100%"}}
                                id="combo-box-demo"
                                options={provinces}
                                getOptionSelected={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={option => option.name || ""} 
                                onChange={(event,value) =>{
                                    this.selectProvince(value);
                                }}
                                renderInput = {params => (
                                    <TextValidator 
                                        {...params}
                                        name= "province"
                                        value= {province}
                                        label={
                                            <span className="font">
                                              <span style={{ color: "red" }}>* </span>
                                              {t("Tỉnh/Thành phố")}
                                            </span>
                                          }
                                          size = "small"
                                          variant = "outlined"
                                          fullWidth
                                          validators={["required"]}
                                    />
                                )}
                            />
                        )}
                    </Grid>
                    
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    {districts && (
                            <Autocomplete 
                                style={{width: "100%"}}
                                id="combo-box-demo"
                                options={districts}
                                getOptionSelected={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={option => option.name || ""}
                                onChange={(event,value) =>{
                                    this.selectDistrict(value);
                                }}
                                renderInput = {params => (
                                    <TextValidator 
                                        {...params}
                                        name= "district"
                                        value= {district}
                                        label={
                                            <span className="font">
                                              <span style={{ color: "red" }}>* </span>
                                              {t("Quận/Huyện")}
                                            </span>
                                          }
                                          size = "small"
                                          variant = "outlined"
                                          fullWidth
                                          validators={["required"]}
                                    />
                                )}
                            />
                        )}
                    </Grid>
                    
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    {communes && (
                            <Autocomplete 
                                style={{width: "100%"}}
                                id="combo-box-demo"
                                options={communes}
                                getOptionSelected={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={option => option.name || ""}
                                onChange={(event,value) =>{
                                    this.selectCommune(value);
                                }}
                                renderInput = {params => (
                                    <TextValidator 
                                        {...params}
                                        name= "commune"
                                        value= {commune}
                                        label={
                                            <span className="font">
                                              <span style={{ color: "red" }}>* </span>
                                              {t("Xã/Phường")}
                                            </span>
                                          }
                                          size = "small"
                                          variant = "outlined"
                                          fullWidth
                                          validators={["required"]}
                                    />
                                )}
                            />
                        )}
                    </Grid>
                   </Grid>
                  
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {handleEditEmployee()}} color="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
                </ValidatorForm>
              </Dialog>
           </div>
        )
    }
}
export default EmployeeEditorDialog;