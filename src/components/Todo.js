import React, { Component } from "react";

class Todo extends Component{
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
            list:[],
            isUpdate:false,
            index:-1
        };
    }

    add(e) {
        e.preventDefault();
        if(!this.state.isUpdate) {
            if(this.state.description != "" || this.state.title != "")
                this.setState({title:"", description:"",list: [...this.state.list, {title: this.state.title, description: this.state.description}]});
            else 
                alert("Fill fields!!");
        }
        else {
            let listnum = this.state.list.map((val, idx) => {
                if(this.state.index == idx){
                    val.description = this.state.description;
                    val.title = this.state.title; 
                }
                return val;
            });
            this.setState({description:"", title:"",list:listnum, isUpdate: !this.state.isUpdate});
        }
    }

    reset(e){
        e.preventDefault();
        this.setState({description:"", title:""});
        if(this.state.isUpdate){
            this.setState({isUpdate: !this.state.isUpdate});
        }
    }

    edit(index){
        this.state.list.forEach((val,idx) => {
            if(index == idx){
                this.setState({title:val.title, description:val.description});
            }
        });
        if(!this.state.isUpdate)
            this.setState({index:index, isUpdate: !this.state.isUpdate});
        else 
            this.setState({index:index})
    }

    delete(index){
        if(window.confirm("Do you want to delete it?")){
            let list = this.state.list.filter((val,idx) => {
                if(index != idx){
                    return val;
                }
            });
            this.setState({list:list,description:"", title:"", isUpdate:false, index:-1});
        }
    }

    inWords (num) {
        let a = ['','first ','second ','third ','fourth ', 'fifth ','sixth ','seventh ','eighth  ','nineth ','tenth ','eleventh ','twelveth '
        ,'thirteenth ','fourteenth ','fifteenth ','sixteenth ','seventeenth ','eighteenth ','nineteenth '];
        let b = ['', '', 'twentieth','thirtieth','fortieth','fiftieth', 'sixtieth','seventieth','eightieth','ninetieth'];

        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
    }
    
    render(){
        return(
            <>
                <h1 className="text-center mt-4">Simple Todo List App</h1>
                <form onSubmit={this.add.bind(this)}>
                    <div className="m-5">
                        <label>Title</label>
                        <div>
                            <input 
                                value={this.state.title} 
                                onChange={(val)=>{this.setState({title:val.target.value})}}
                            />
                        </div>
                        <label className="mt-3">Description</label>
                        <div>
                            <textarea className="w-25 p-2"
                                value={this.state.description}
                                onChange={(val)=>{this.setState({description:val.target.value})}}
                            />
                        </div>
                        <div>
                            <button  class="btn btn-outline-dark">{ this.state.isUpdate ? "Update" : "Add" }</button>
                            <button  class="btn btn-outline-dark m-4" onClick={ this.reset.bind(this) }>{ this.state.isUpdate? "Cancel" : "Reset" }</button>
                        </div>
                    </div>
                    <hr/>
                </form>

                {this.state.list.map((val, idx) => {
                    return(
                        <div className="m-5">
                            <h2> The {this.inWords(idx + 1)} todo title</h2>
                            <div>
                                <h3>{val.title}</h3>
                                <p>{val.description}</p>
                            </div>
                            <div>
                                <button class="btn btn-outline-dark" onClick={() => this.edit(idx)}>Edit</button>
                                <button class="btn btn-outline-dark m-4" onClick={() => this.delete(idx)}>Delete</button>
                            </div>
                            <hr style={{borderStyle: "dotted", backgroundColor:"black"}}/>
                        </div>
                    );
                })}
            </>
        );
    }
}
export default Todo;