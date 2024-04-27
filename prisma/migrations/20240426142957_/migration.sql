-- CreateTable
CREATE TABLE `Mis_V_CYP_YGSJ` (
    `ygdm` VARCHAR(15) NOT NULL,
    `ygmc` VARCHAR(15) NOT NULL,
    `sjhm` VARCHAR(15) NULL,

    UNIQUE INDEX `Mis_V_CYP_YGSJ_ygdm_key`(`ygdm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
