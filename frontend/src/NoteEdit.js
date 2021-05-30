import { getByText } from '@testing-library/dom';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class NoteEdit extends Component{
    emptyItem = {
        text: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount(){
        if(this.props.match.params.id !== 'new'){
            const note = await (await fetch('/notes/'+ this.props.match.params.id )).json();
            this.setState({item: note});
        }
    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        await fetch('/notes' + (item.id ? '/' + item.id:''),{
            method: (item.id)? 'PUT':'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)

        });
        this.props.history.push('/notes');
    }
    render(){
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Note' : 'Add Note'}
        </h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Label for="text">Text</Label>
                    <Input type="text" name="text" id="text" value={item.text || ''}
                           onChange={this.handleChange} autoComplete="text"/>
                    </FormGroup>
                    <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/notes">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(NoteEdit);