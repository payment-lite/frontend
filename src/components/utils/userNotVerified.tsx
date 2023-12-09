import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const UserNotVerified = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        className="bg-indigo-500 hover:bg-indigo-600"
        onClick={open}
        size="xl"
        fullWidth
      >
        Verified Now!
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Verify Your Account"
      ></Modal>
    </>
  );
};

export default UserNotVerified;
