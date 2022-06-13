import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Blogs />
        </div>
        <div className="col-md-4">
          <AddBlog />
        </div>
      </div>

    </div>
  );
}

export default App;
