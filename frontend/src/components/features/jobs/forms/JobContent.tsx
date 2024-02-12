import React, { useEffect} from 'react';
// Material UI
import { 
  Box, 
  Button, 
  Typography, 
  TextField, 
} from "@mui/material";

// Hooks Form
import { Controller, useForm } from "react-hook-form";

// フォームの型定義
export interface JobContentType {
  content: string;
  developmentEnv: string;
}

function JobContent(props: any) {

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobContentType>({
    defaultValues: {
      content: "",
      developmentEnv: ""
    },
    mode: "all",
  });

  const onSubmit = (data: JobContentType) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, JobContentForm: data });
  };


  useEffect(() => {
    if (props.formValue.JobContentForm) {
      setValue("content", props.formValue.JobContentForm.content, {
        shouldDirty: true,
      });
      setValue("developmentEnv", props.formValue.JobContentForm.developmentEnv, {
        shouldDirty: true,
      });
    }
  }, []);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        2.業務情報を入力
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        <Typography>
          業務内容を入力してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="業務内容を入力"
                error={errors.content ? true : false}
                helperText={errors.content?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
          開発環境
        </Typography>

        <Box mb={3}>
          <Controller
            name="developmentEnv"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="開発環境"
                error={errors.developmentEnv ? true : false}
                helperText={errors.developmentEnv?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
            戻る
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="outlined">
            次へ
          </Button>
        </Box>
      </form>
      
    </React.Fragment>
  );
}

export default JobContent

