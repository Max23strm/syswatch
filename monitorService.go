package main

import (
	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
)

type MonitorService struct{}

func (m *MonitorService) GetCpuPerc() ([]float64, error) {

	return cpu.Percent(0, false)
}

func (m *MonitorService) GetDiskUsage() (*disk.UsageStat, error) {

	return disk.Usage("/")
}
