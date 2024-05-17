import GroupForm from '@/components/Group/GroupForm';
import AppBar from '@/components/common/AppBar';
import Dialog from '@/components/common/Dialog';
import { useAddGroupSchedule } from '@/hooks/useAddGroupSchedule';
import { Member } from '@/types/Member';

const AddGroupPage = () => {
  const { addGroupSchedule, isPending, failDialogRef, successDialogRef } = useAddGroupSchedule();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, userList: Member[]) => {
    e.preventDefault();
    // TODO: 멤버 1명 이상이여야 한다.
    // TODO: 타이틀, 시작일, 종료시간 은 필수 값이며 빈 값일 수 없다.
    // TODO: 종료일은 시작일보다 크거나 같아야 한다.
    addGroupSchedule(e, userList);
  };

  return (
    <div className="flex min-h-dvh w-screen flex-col overflow-x-hidden px-6">
      <AppBar backButton title={'모임 등록하기'} />
      <GroupForm onSubmit={handleSubmit} isLoading={isPending} />
      <Dialog ref={successDialogRef} desc="모임 일정이 등록되었습니다." />
      <Dialog ref={failDialogRef} desc="모임 일정 등록에 실패했습니다." />
    </div>
  );
};

export default AddGroupPage;
