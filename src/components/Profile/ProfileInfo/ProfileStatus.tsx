import React, { ChangeEvent } from 'react'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || '-----'}</span>
                </div>}
                {this.state.editMode && <div>
                    <input value={this.state.status} onChange={this.onStatusChange} autoFocus={true} onBlur={this.diactivateEditMode.bind(this)} />
                </div>}
            </div >
        )
    }
}
