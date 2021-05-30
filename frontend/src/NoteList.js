import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {notes: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/notes')
            .then(response => response.json())
            .then(data => this.setState({notes: data}));
    }
    async remove(id) {
        await fetch('/notes/' + id,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application.json'
            }
        }).then(() => {
            let updatedNotes = [...this.state.notes]
            .filter(i => i.id !== id);
            this.setState({notes: updatedNotes});
        });
    }

    render(){
        const {notes, isLoading} = this.state;
        if(isLoading){
            return <p>Loading...</p>;
        }

        const noteList = notes.map(note => {
            return <tr key={note.id}>
                               <td style={{whiteSpace: 'nowrap'}}>{note.text}</td>
                               <td>
                                   <ButtonGroup>
                                       <Button size="sm" color="primary" tag={Link} to={"/notes/" + note.id}>Edit</Button>
                                       <Button size="sm" color="danger" onClick={() => this.remove(note.id)}>Delete</Button>
                                   </ButtonGroup>
                               </td>
                           </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/notes/new">
                            Add Note
                        </Button>
                    </div>
                    <h3>Notes</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="70%">Note Text</th>
                        <th width="30%"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {noteList}
                    </tbody>
                </Table>
                </Container>
            </div>
        );
    }
}
export default NoteList;