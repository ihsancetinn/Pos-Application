import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    
    try {
      fetch("http://localhost:5000/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      message.success("Kategori başarıyla güncellendi.");
      setCategories(
        categories.map((item, _id) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Silmek İstediğinize Emin Misiniz?")) {
      try {
        fetch("http://localhost:5000/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        message.error("Kategori silme işlemi iptal edildi.");
      }
    } else {
      return categories;
    }
  };

  const columns = [
    {
      title: "Kategoriler",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
