import { useState } from "react";

function formField(prop) {
    const [fileData, setFileData] = useState({file: null, text:'' });
    const [inputData, setInputData] = useState('');
    function handleFileData(e){
        let file = e.target.files[0].size;
        let maxSize = 5*1024*1024
        if(file > maxSize) return alert("file size is above 5mb")
        const { name, value } = e.target
        setFileData((prev) => ({ ...prev, [name]: value }))
        //alert(JSON.stringify(fileData))
    }
    function handleSubmit(e) {
        e.preventDefault();
        const buttonName = e.nativeEvent.submitter.name;
        if(!fileData.file) return alert("something went wrong")
        alert(`query is ${inputData}, file is ${JSON.stringify(fileData)} and button is ${buttonName}`)
    }
    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={handleSubmit}>
                <h2 className="form-signin-heading">How can I help you</h2>
                
                {/* Unified Input Group */}
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="text"
                        placeholder="Enter your Query"
                        required
                        autoFocus
                        onChange={(e)=> setInputData(e.target.value)}
                    />
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        required
                        onChange={(e)=>handleFileData(e)}
                    />
                </div>
                
                {/* Conditional buttons based on 'prop.risk' */}
                {prop.risk ? (
                    <div className="form-btn-control">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" name="Modify">Modify</button>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" name="Add">Add</button>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" name="Load">Load</button>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" name="Delete">Delete</button>
                    </div>
                ) : <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>}
            </form>
        </div>
    );
}

export default formField;
