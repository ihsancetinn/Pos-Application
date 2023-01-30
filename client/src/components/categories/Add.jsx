import React from "react";
import { Button, Form, Input, Modal,message } from "antd";

import "./style.css";

const Add = ({isAddModalOpen, setIsAddModalOpen,categories,setCategories}) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
        try {
          fetch(process.env.REACT_APP_SERVER_URL + " /categories/add-category", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
          message.success(`${values.title} başarıyla eklendi.`);
          form.resetFields();
          setCategories([...categories, {
            _id:Math.random(),
            title:values.title
          }])
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
          <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Add