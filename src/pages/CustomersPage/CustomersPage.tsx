import { message, Space, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { useCustomersStore } from "../../store/useCustomersStore";
import Column from "antd/es/table/Column";
import CustomerInfoModal from "../../components/CustomerInfoModal/CustomerInfoModal";
import { ICustomer } from "../../models/ICustomer";
import {
  CustomersService,
  GetCustomersParams,
} from "../../api/customersService";
import { customersColumns } from "./customersTable";
import SearchFilters from "../../components/SearchFilters/SearchFilters";

const CustomersPage: FC = () => {
  const { customers, fetchCustomers } = useCustomersStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );

  const [searchParams, setSearchParams] = useState<GetCustomersParams>({});

  useEffect(() => {
    console.log(searchParams);
    fetchCustomers(searchParams);
  }, [fetchCustomers, searchParams]);

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
      fetchCustomers(searchParams);
    }
  };

  const handleSearch = (params: GetCustomersParams) => {
    setSearchParams(params);
  };

  return (
    <div>
      <SearchFilters onSearch={handleSearch} />
      <Table
        dataSource={customers}
        pagination={{ pageSize: 4 }}
        rowKey="customer_code"
      >
        {customersColumns.map((col) => (
          <Column
            key={col.key}
            {...{ title: col.title, dataIndex: col.dataIndex }}
          />
        ))}
        <Column
          title="Customer main"
          key="customer_code_main"
          render={(_, record: ICustomer) => (
            <Space size="middle">
              {record?.customer_code_main?.customer_name}
            </Space>
          )}
        />
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
        customersList={customers}
        onUpdate={handleUpdateCustomer}
        open={isModalVisible}
        customer={selectedCustomer}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CustomersPage;
