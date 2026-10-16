
import react,{useState} from 'react'

const App = () => {
 const [form, setForm] = useState({
  firstName: "", email: "", age: "",
});
 
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};
return(
 <> 
 <label>HIiiii</label>
 <h1>Form</h1>
<input name="firstName" value={form.firstName}
       onChange={handleChange} />
<input name="email" value={form.email}
       onChange={handleChange} />
<input name="age" value={form.age}
       onChange={handleChange} />

       </>
)}

export default App