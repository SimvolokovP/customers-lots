import { message, Space, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { useCustomersStore } from "../../store/useCustomersStore";
import Column from "antd/es/table/Column";
import CustomerInfoModal from "../../components/CustomerInfoModal/CustomerInfoModal";
import { ICustomer } from "../../models/ICustomer";
import { CustomersService } from "../../api/customersService";

const columns = [
  {
    title: "Customer Name",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Customer INN",
    dataIndex: "customer_inn",
    key: "customer_inn",
  },
  {
    title: "Customer Email",
    dataIndex: "customer_email",
    key: "customer_email",
  },
];

const CustomersPage: FC = () => {
  const { customers, fetchCustomers } = useCustomersStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleOpenModal = async (customer: any) => {
    const targetCustomer = await CustomersService.getCustomerById(customer.id);

    if (targetCustomer) {
      setSelectedCustomer(targetCustomer);
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };

  const handleUpdateCustomer = async (updatedCustomer: ICustomer) => {
    try {
      await CustomersService.updateCustomer(updatedCustomer);
      message.success("Customer updated successfully!");
    } catch (error) {
      message.error("Failed to update customer.");
    } finally {
      fetchCustomers();
    }
  };

  return (
    <div>
      <Table
        dataSource={customers}
        pagination={{ pageSize: 4 }}
        rowKey="customer_code"
      >
        {columns.map((col) => (
          <Column
            key={col.key}
            {...{ title: col.title, dataIndex: col.dataIndex }}
          />
        ))}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => handleOpenModal(record)}>
                Edit {record.customer_name}
              </a>
            </Space>
          )}
        />
      </Table>

      <CustomerInfoModal
        onUpdate={handleUpdateCustomer}
        open={isModalVisible}
        customer={selectedCustomer}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CustomersPage;
