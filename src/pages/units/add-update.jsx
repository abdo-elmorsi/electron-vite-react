import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useIndexedDB, useInput } from '@/hooks';
import { Button, Input } from '@/components';

const UnitForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: units, addItem, updateItem } = useIndexedDB('units');
  const [editing, setEditing] = useState(false);

  const name = useInput("", null);
  const description = useInput("", null);


  useEffect(() => {
    if (id) {
      const unit = units?.find((units) => units.id === parseInt(id)) || null;
      if (unit) {
        name.changeValue(unit.name)
        description.changeValue(unit.description)
        setEditing(true);
      }
    }
  }, [id, units]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateItem(parseInt(id), { name: name.value, description: description.value });
    } else {
      console.log({ name: name.value, description: description.value });

      addItem({ name: name.value, description: description.value });
    }
    navigate('/units');
  };

  return (
    <div className="p-6 px-8 rounded-md bg-gray-50 dark:bg-gray-900 ">
      <nav className="text-gray-700 dark:text-gray-300 mb-4">
        <ul className="list-reset flex">
          <li>
            <Link to="/units" className="text-blue-500 dark:text-blue-400 hover:underline">
              وحدات القياس
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className={editing ? 'text-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-300'}>
            {editing ? 'تعديل' : 'أضافه'}
          </li>
        </ul>
      </nav>
      <h1 className="text-2xl mb-4 text-gray-800 dark:text-white">
        {editing ? 'تعديل وحده' : 'اضافه وحده'}
      </h1>
      <form>
        <div className='flex justify-start items-start flex-wrap gap-6 flex-col'>

          <div className="mb-4 w-5/12">
            <Input
              mandatory
              label={"اسم الوحده"}
              {...name.bind}
              name="name"
            />


          </div>
          <div className="mb-4 w-5/12">
            <Input
              label={"تفاصيل"}
              {...description.bind}
              name="description"
            />


          </div>
        </div>
        <Button disabled={!name.value} onClick={handleSubmit}>
          {editing ? 'تعديل' : 'اضافه'}
        </Button>
      </form>
    </div>
  );
};

export default UnitForm;