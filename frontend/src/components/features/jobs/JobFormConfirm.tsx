import React, { useContext } from 'react'
import { 
    Box, 
    Button, 
    Typography,
    Divider
  } from "@mui/material";

// API  
import { createJob } from "api/job";
import { AuthContext } from "App"

// 雇用形態のマスターデータ
import { employmentSystems } from 'data/employmentSystems';

function JobFormConfirm(props: any) {

  const { currentUser } = useContext(AuthContext)

  // ログインユーザーの値を定義
  const userId = currentUser?.id

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const formData = {
        // propsから取得したデータをセット
        title: props.formValue.JobPositionForm.title,
        position: props.formValue.JobPositionForm.position,
        employmentSystem: props.formValue.JobPositionForm.employmentSystem,
        content: props.formValue.JobContentForm.content,
        developmentEnv: props.formValue.JobContentForm.developmentEnv,
        requiredApply: props.formValue.RecruitPersonForm.requiredApply,
        welcomeApply: props.formValue.RecruitPersonForm.welcomeApply,
        seekPerson: props.formValue.RecruitPersonForm.seekPerson,
        workEnv: props.formValue.EmploymentForm.workEnv,
        process: props.formValue.EmploymentForm.process,
        salarySystem: props.formValue.EmploymentForm.salarySystem,
        userId: userId
      };
      
      // axios.post を使ってデータを送信
      const res = await createJob(formData);

      console.log(props.formState);
      console.log(res)
      props.handleNext();
    } catch(error) {
      console.log("フォームの送信に失敗しました")
    }

  };
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        入力内容の確認
      </Typography>

      <Divider sx={{ my: 1 }} />
      <Typography>募集タイトル：{props.formValue.JobPositionForm.title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>募集ポジション：{props.formValue.JobPositionForm.position}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>雇用形態：{employmentSystems[props.formValue.JobPositionForm.employmentSystem]}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>業務内容：{props.formValue.JobContentForm.content}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>開発環境：{props.formValue.JobContentForm.developmentEnv}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>必須条件：{props.formValue.RecruitPersonForm.requiredApply}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>歓迎条件：{props.formValue.RecruitPersonForm.welcomeApply}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>求める人物像：{props.formValue.RecruitPersonForm.seekPerson}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>働く環境：{props.formValue.EmploymentForm.workEnv}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>選考プロセス：{props.formValue.EmploymentForm.process}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>給与形態：{props.formValue.EmploymentForm.salarySystem}</Typography>
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ display: "flex", justifyContent: 'center', pt: 2 }}>
        <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
          戻る
        </Button>
        <Button onClick={handleSubmit} variant="outlined">
          募集を公開する
        </Button>
      </Box>
    </div>
  );
}

export default JobFormConfirm;
