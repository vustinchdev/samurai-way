import React from 'react'

type ProfileStatusType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
        this.state.editMode = true
    }

    diactivateEditMode() {
        this.setState({
            editMode: false
        })
        this.state.editMode = false
    }

    render() {
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                </div>}
                {this.state.editMode && <div>
                    <input value={this.props.status} autoFocus={true} onBlur={this.diactivateEditMode.bind(this)} />
                </div>}
            </div >
        )
    }
}
