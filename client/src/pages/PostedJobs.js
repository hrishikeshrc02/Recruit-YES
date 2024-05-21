import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal } from "antd";
import {
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

function PostedJobs() {
  const alljobs = useSelector((state) => state.jobsReducer.jobs);
  const allusers = useSelector((state) => state.usersReducer.users);
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy === userid);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Applied Candidates",
      dataIndex: "appliedCandidates",
    },
    {
      title: "Actions",
      render: (text, data) => (
        <div className="flex">
          <EditOutlined
            className='mr-2'
            style={{ fontSize: 20 }}
            onClick={() => {
              history.push(`/editjob/${data.completeJobData._id}`);
            }}
          />
          <OrderedListOutlined
            style={{ fontSize: 20 }}
            onClick={() => {
              showModal(data.completeJobData);
            }}
          />
        </div>
      ),
    },
  ];

  const dataSource = userPostedJobs.map((job) => ({
    title: job.title,
    company: job.company,
    postedOn: moment(job.createdAt).format("MMM DD yyyy"),
    appliedCandidates: job.appliedCandidates.length,
    completeJobData: job,
  }));

  const showModal = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => (
          <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
        ),
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];

    const candidatesDatasource = selectedJob ? selectedJob.appliedCandidates.map((candidate) => {
      const user = allusers.find((user) => user._id === candidate.userid);

      return {
        candidateId: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        appliedDate: moment(candidate.appliedDate).format("MMM DD yyyy"),
      };
    }) : [];

    return <Table columns={candidatesColumns} dataSource={candidatesDatasource} />;
  }

  return (
    <div>
      <DefaultLayout>
        <h1>Posted Jobs</h1>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Applied Candidates List"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          {selectedJob && <CandidatesList />}
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default PostedJobs;

