import { Button, Form, Input, Modal, message, Select } from "antd";
import React from "react";
import "./style.css";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success(`${values.title} başarıyla eklendi.`);
      form.resetFields();
      setProducts([
        ...products,
        { ...values, _id: Math.random(),price:Number(values.price), title: values.title },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Yeni Ürün Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[{ required: true, message: "Ürün Alanı Boş Geçilemez!" }]}
          >
            <Input placeholder="Ürün adı giriniz" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli"
            rules={[
              { required: true, message: "Ürün Gçrseli Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün görseli giriniz" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyat Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Kategori Seçiniz"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLocaleLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
