package com.mini6.foodfoodjeju.dto.userdto;

import com.mini6.foodfoodjeju.model.User;
import lombok.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter @Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UserInfoDto {
    @NotNull
    @Size(min = 3, max = 50)
    String username;
    boolean isAdmin;
}
