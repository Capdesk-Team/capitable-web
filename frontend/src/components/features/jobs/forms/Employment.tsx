// Hooks API
import { useEffect } from "react";
// Material UI
import { 
  Box, 
  Button, 
  TextField, 
  Typography 
} from "@mui/material";
// Hook Form
import { Controller, useForm } from "react-hook-form";

// フォームの型定義
export interface EmploymentType {
  workEnv: string;
  process: string;
  salarySystem: string;
}

function Application(props: any) {

  const { control, handleSubmit, setValue, formState:{errors}} =
    useForm<EmploymentType>({
      defaultValues: {
        workEnv: "",
        process: "",
        salarySystem: "",
      },
      mode: "all",
    });

  const onSubmit = (data: EmploymentType) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, EmploymentForm: data });
  };

  useEffect(() => {
    if (props.formValue.EmploymentForm) {
      setValue("workEnv", props.formValue.EmploymentForm.workEnv, {
        shouldDirty: true,
      });
      setValue("process", props.formValue.EmploymentForm.process, {
        shouldDirty: true,
      });
      setValue("salarySystem", props.formValue.EmploymentForm.salarySystem, {
        shouldDirty: true,
      });
    }
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        4. 雇用情報を入力
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography gutterBottom >
          働く環境
        </Typography>

        <Box mb={3}>
          <Controller
            name="workEnv"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="働く環境"
                error={errors.workEnv ? true : false}
                helperText={errors.workEnv?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
          選考プロセス
        </Typography>

        <Box mb={3}>
          <Controller
            name="process"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="選考プロセス"
                error={errors.process ? true : false}
                helperText={errors.process?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
        　給与形態
        </Typography>

        <Box mb={3}>
          <Controller
            name="salarySystem"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="給与形態"
                error={errors.salarySystem ? true : false}
                helperText={errors.salarySystem?.message}
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
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            次へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Application;
